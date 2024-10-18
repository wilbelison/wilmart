document.addEventListener('DOMContentLoaded', () => {
    console.log('Wilmart JavaScript carregado');

    // Exemplo de funcionalidade: Atualizar quantidade no carrinho
    const quantityInputs = document.querySelectorAll('.cart-quantity');
    quantityInputs.forEach(input => {
        input.addEventListener('change', (event) => {
            const productId = event.target.dataset.productId;
            const newQuantity = event.target.value;
            updateCartQuantity(productId, newQuantity);
        });
    });
});

function updateCartQuantity(productId, quantity) {
    // Aqui você pode implementar a lógica para atualizar a quantidade no carrinho
    // Por exemplo, fazer uma requisição AJAX para o servidor
    console.log(`Atualizando quantidade do produto ${productId} para ${quantity}`);
}