import {ClientFunction, Selector} from "testcafe";

fixture("/admin/login").page("http://localhost:5000/admin/login")

test("Error message when email does not exist", async t => {
    let validationExists = await Selector(".account-message").exists
    await t.expect(validationExists).notOk()
    await t.typeText("#loginEmail", "null@null.com")
    await t.typeText("#loginPassword", "null@null.com")
    await t.click(Selector("button").withAttribute("type", "submit"))

    validationExists = Selector(".account-message").exists
    await t.expect(validationExists).ok()
})

test("Error message when password is incorrect", async t => {
    let validationExists = await Selector(".account-message").exists
    await t.expect(validationExists).notOk()
    await t.typeText("#loginEmail", "stigma@stigma.com")
    await t.typeText("#loginPassword", "stigma@stigma.com")
    await t.click(Selector("button").withAttribute("type", "submit"))

    validationExists = Selector(".account-message").exists
    await t.expect(validationExists).ok()
})

test("Successful login redirects to dashboard", async t => {
    await t.typeText("#loginEmail", "stigma@stigma.com")
    await t.typeText("#loginPassword", "stigma")
    await t.click(Selector("button").withAttribute("type", "submit"))

    const location = await ClientFunction(() => document.location.href)
    await t.expect(location()).eql("http://localhost:5000/admin/")
})