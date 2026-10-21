from pathlib import Path
import re
from playwright.sync_api import expect
from browser_support import browser, static_site


REPO = Path(__file__).resolve().parents[1]

def test_onboarding_quest_quiz_persistence():
    with static_site(REPO / 'dist') as url, browser() as b:
        page = b.new_page(viewport={'width': 390, 'height': 844})
        errors = []
        page.on('pageerror', lambda error: errors.append(str(error)))
        page.goto(url)
        page.get_by_role('button', name='Start my roadmap', exact=True).click()
        page.goto(url + '/quests')
        page.get_by_role('button', name=re.compile('^Complete ')).first.click()
        expect(page.get_by_role('button', name='Quest completed', exact=True)).to_have_count(1)
        page.reload()
        expect(page.get_by_role('button', name='Quest completed', exact=True)).to_have_count(1)
        page.get_by_role('button', name='Take a quiz', exact=True).click()
        for index in range(5):
            page.get_by_role('button', name=re.compile('^A ')).click()
            page.get_by_role('button', name='Finish quiz' if index == 4 else 'Next question', exact=True).click()
        expect(page.get_by_text(re.compile('^[0-5]/5 correct$'))).to_be_visible()
        page.reload()
        persisted = page.evaluate("JSON.parse(localStorage.getItem('orbitmentor-store'))")
        assert persisted['onboardingCompleted'] is True
        assert len(persisted['completedQuests']) == 1
        assert len(persisted['quizResults']) == 1
        assert persisted['xp'] > 0
        assert page.evaluate('document.documentElement.scrollWidth <= innerWidth')
        assert not errors, errors


def test_corrupt_storage_is_preserved_and_explained():
    with static_site(REPO / 'dist') as url, browser() as b:
        page = b.new_page()
        page.add_init_script("localStorage.setItem('orbitmentor-store', '{invalid');")
        errors = []
        page.on('pageerror', lambda error: errors.append(str(error)))
        page.goto(url)
        expect(page.get_by_role('alert')).to_contain_text('stored copy is unchanged')
        page.get_by_role('button', name='Start my roadmap', exact=True).click()
        assert page.evaluate("localStorage.getItem('orbitmentor-store')") == '{invalid'
        assert not errors, errors


def test_unavailable_storage_shows_unsaved_progress():
    with static_site(REPO / 'dist') as url, browser() as b:
        page = b.new_page()
        page.add_init_script("""
          const original = Storage.prototype.setItem;
          Storage.prototype.setItem = function(key, value) {
            if (key === 'orbitmentor-store') throw new DOMException('Quota exceeded', 'QuotaExceededError');
            return original.call(this, key, value);
          };
        """)
        errors = []
        page.on('pageerror', lambda error: errors.append(str(error)))
        page.goto(url)
        page.get_by_role('button', name='Start my roadmap', exact=True).click()
        expect(page.get_by_role('alert')).to_contain_text('could not be saved')
        assert page.evaluate("localStorage.getItem('orbitmentor-store')") is None
        assert not errors, errors
