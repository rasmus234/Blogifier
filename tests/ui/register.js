import {Selector, ClientFunction} from "testcafe";

fixture("Register Fixture").page("http://localhost:5000")

test(".validation-message exists", async t => {
    let validationExists = await Selector(".validation-message").exists
    await t.expect(validationExists).notOk()

    await t.click("#submit")

    validationExists = Selector(".validation-message").exists
    await t.expect(validationExists).ok()
})

test("Passwords do not match error", async t => {
    await t.typeText("#registerPassword", "stigma")
    await t.typeText("#registerConfirmPassword", "stigmata")
    await t.click("#submit")

    const validationExists = await Selector(".validation-message").withText("Passwords do not match").exists
    await t.expect(validationExists).ok()
})

test("Successfully create account", async t => {
    await t.typeText("#registerEmail", "stigma@stigma.com")
    await t.typeText("#registerName", "stigmathagod")
    await t.typeText("#registerPassword", "stigma")
    await t.typeText("#registerConfirmPassword", "stigma")
    await t.useRole(Role.anonymous()).click("#submit")

    const location = await ClientFunction(() => document.location.href)
    await t.expect(location()).contains("/admin/login")
})