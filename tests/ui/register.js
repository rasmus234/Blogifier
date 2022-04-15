import {Selector, ClientFunction} from "testcafe";

fixture("/admin/register").page("http://localhost:5000/admin/register")

test("Error messages when no information is provided", async t => {
    let validationExists = await Selector(".validation-message").exists
    await t.expect(validationExists).notOk()
    await t.click("#submit")

    validationExists = Selector(".validation-message").exists
    await t.expect(validationExists).ok()
})

test("Error when passwords do not match", async t => {
    await t.typeText("#registerPassword", "stigma")
    await t.typeText("#registerConfirmPassword", "stigmata")
    await t.click("#submit")

    const validationExists = await Selector(".validation-message").withText("Passwords do not match").exists
    await t.expect(validationExists).ok()
})

test("Create account successfully", async t => {
    await t.typeText("#registerEmail", "stigma@stigma.com")
    await t.typeText("#registerName", "stigmathagod")
    await t.typeText("#registerPassword", "stigma")
    await t.typeText("#registerConfirmPassword", "stigma")
    await t.click("#submit")

    const location = await ClientFunction(() => document.location.href)
    await t.expect(location()).contains("/admin/login")
})