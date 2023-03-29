import {Selector, ClientFunction} from 'testcafe';

fixture('Admin Registration')
    .page('http://localhost:9888/admin/register');

test('RegistrationEmptyFiles', async test => {
    await test
        .click('#app > div > form > button')
        .expect(Selector('#app > div > form > div:nth-child(1) > div').innerText).eql('The Email field is required.')
        .expect(Selector('#app > div > form > div:nth-child(2) > div').innerText).eql('The Name field is required.')
        .expect(Selector('#app > div > form > div:nth-child(3) > div').innerText).eql('The Password field is required.')
        .expect(Selector('#app > div > form > div:nth-child(4) > div').innerText).eql('The PasswordConfirm field is required.')
        .takeScreenshot()
})

test('RegistrationNotMatchingPassword', async test => {
    await test
        .typeText('#registerEmail', 'Enemail@gmail.com')
        .typeText('#registerName', 'John Doe')
        .typeText('#registerPassword', 'jan1234')
        .typeText('#registerConfirmPassword', '1234jan')
        .click('#app > div > form > button')
        .takeScreenshot()
        .expect(Selector('#app > div > form > div:nth-child(4) > div').innerText).eql('Passwords do not match')
})

test('RegistrationSuccess', async test => {
    const getLocation = ClientFunction(() => document.location.href)

    await test
        .typeText('#registerEmail', 'Enemail@gmail.com')
        .typeText('#registerName', 'John Doe')
        .typeText('#registerPassword', 'jan1234')
        .typeText('#registerConfirmPassword', 'jan1234')
        .click('#app > div > form > button')
        .expect(getLocation()).contains('http://localhost:9888/admin/login/')
        .takeScreenshot()
})

fixture('Admin Login')
    .page('http://localhost:9888/admin/login/');

test('LoginWrongEmail', async test => {
    await test
        .typeText('#loginEmail', 'thisshouldnotexist@hotmail.com')
        .typeText('#loginPassword', 'jan1234')
        .click('#app > div > form > button')
        .takeScreenshot()
        .expect(Selector('#app > div > div').innerText).eql('Login failed, please try again.')
})

test('LoginWrongPassword', async test => {
    await test
        .typeText('#loginEmail', 'Enemail@gmail.com')
        .typeText('#loginPassword', '1234jan')
        .click('#app > div > form > button')
        .takeScreenshot()
        .expect(Selector('#app > div > div').innerText).eql('Login failed, please try again.')
})


test('LoginSuccess', async test => {
    const getLocation = ClientFunction(() => document.location.href)

    await test
        .typeText('#loginEmail', 'Enemail@gmail.com')
        .typeText('#loginPassword', 'jan1234')
        .click('#app > div > form > button')
        .expect(getLocation()).contains('http://localhost:9888/admin/')
        .takeScreenshot()
})
