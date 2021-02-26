const highlight = require('./index')

test('Test consecutive matched text', () => {
    expect(highlight('thin', 'this is a thin text on input', {tag: 'strong', consecutive: true}))
    .toBe('this is a <strong>thin</strong> is a thin text on input')
})

test('Test nonconsecutive matched text', () => {
    expect(highlight('thin', 'this is a thin text on input', {tag: 'strong', consecutive: false}))
    .toBe('<strong>thi</strong>s is a thi<strong>n</strong> text on input')
})

test('Test not matched text in consecutively', () => {
    expect(highlight('outer', 'this is a thin text on input', {tag: 'strong', consecutive: true}))
    .toBe(null)
})

test('Test not matched text in nonconsecutively', () => {
    expect(highlight('outer', 'this is a thin text on input', {tag: 'strong', consecutive: false}))
    .toBe(null)
})
