// Espera até que todo o conteúdo da página seja carregado antes de executar o código
document.addEventListener("DOMContentLoaded", () => {
    // Obtém os parâmetros da URL da página atual
    const urlParams = new URLSearchParams(window.location.search);
    // Obtém o valor do parâmetro 'titulo' da URL
    const receitaTitulo = urlParams.get('titulo');
    
    // Encontra a receita na lista de receitas com base no título fornecido
    const receita = receitas.find(r => r.titulo === receitaTitulo);
    
    // Verifica se a receita foi encontrada
    if (receita) {
        // Atualiza o conteúdo da página com os detalhes da receita
        document.getElementById('recipe-title').innerText = receita.titulo;
        document.getElementById('recipe-ingredients').innerText = receita.ingredientes;
        document.getElementById('recipe-method').innerText = receita.modo_fazer;
    } else {
        // Se a receita não for encontrada, exibe uma mensagem de erro no console
        console.error('Receita não encontrada!');
    }
});

