const layout = require('../layout/layout');

module.exports = ({items}) => {
    const renderedItems = items.map((item) => {
        return `
            <div>
                ${item.product.title} - ${item.product.price}
            </div>
        `
    }).join('');

    return layout ({
        content: `
            <h1>${renderedItems}</h1>
        `
    })
}