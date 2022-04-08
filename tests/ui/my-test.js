fixture("My test fixture")

test.page("http://localhost:5000")("My first test", async test => {
    await test.click("#submit").expect(true).ok()
})