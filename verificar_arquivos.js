// Script para verificar se todos os arquivos necessários existem
const fs = require('fs');
const path = require('path');

console.log('Verificando arquivos necessários para o GitHub Pages...');

const arquivosNecessarios = [
    'index.html',
    'choices.html',
    'style.css',
    'choices.css',
    'script.js',
    'choices.js',
    'img/bb.jpeg',
    'img/Resident.jpg',
    'img/It Takes Two.jpg',
    'img/The lost of Us.jpg',
    'img/susurra.jpg',
    'img/dracula.jpg',
    'img/Thokyo.jpg',
    'audio/Fim_Ou_Intervalo___De_Trás_Pra_Frente___Faz_Tempo__Ao_Vivo_Em_Brasília_(128k).m4a'
];

const arquivosFaltando = [];
const arquivosImagens = [];

// Verificar existência dos arquivos
for (const arquivo of arquivosNecessarios) {
    if (!fs.existsSync(arquivo)) {
        arquivosFaltando.push(arquivo);
    }
    
    // Coleta arquivos de imagem para verificação de tamanho
    if (arquivo.startsWith('img/')) {
        arquivosImagens.push(arquivo);
    }
}

// Verificar caminhos nos arquivos HTML e JS
const arquivosParaVerificar = ['index.html', 'choices.html', 'script.js', 'choices.js'];
const caminhosIncorretos = [];

for (const arquivo of arquivosParaVerificar) {
    if (fs.existsSync(arquivo)) {
        const conteudo = fs.readFileSync(arquivo, 'utf8');
        
        // Procurar por caminhos que começam com barra (/)
        const regex = /src=["']\/[^"']*["']|href=["']\/[^"']*["']|new Audio\(['"]\/[^'"]*['"]\)/g;
        const matches = conteudo.match(regex);
        
        if (matches && matches.length > 0) {
            caminhosIncorretos.push({
                arquivo,
                caminhos: matches
            });
        }
    }
}

// Verificar tamanho das imagens
const imagensGrandes = [];
for (const imagem of arquivosImagens) {
    if (fs.existsSync(imagem)) {
        const stats = fs.statSync(imagem);
        // Verificar se a imagem é maior que 1MB
        if (stats.size > 1024 * 1024) {
            imagensGrandes.push({
                arquivo: imagem,
                tamanho: (stats.size / (1024 * 1024)).toFixed(2) + 'MB'
            });
        }
    }
}

// Exibir resultados
console.log('\n=== RESULTADO DA VERIFICAÇÃO ===\n');

if (arquivosFaltando.length === 0 && caminhosIncorretos.length === 0 && imagensGrandes.length === 0) {
    console.log('✅ Tudo pronto para publicação no GitHub Pages!');
} else {
    console.log('⚠️ Foram encontrados problemas que precisam ser corrigidos:');
    
    if (arquivosFaltando.length > 0) {
        console.log('\n❌ ARQUIVOS FALTANDO:');
        arquivosFaltando.forEach(arquivo => console.log(`   - ${arquivo}`));
    }
    
    if (caminhosIncorretos.length > 0) {
        console.log('\n❌ CAMINHOS INCORRETOS:');
        caminhosIncorretos.forEach(item => {
            console.log(`   No arquivo ${item.arquivo}:`);
            item.caminhos.forEach(caminho => console.log(`     - ${caminho}`));
        });
        console.log('\n   ATENÇÃO: Caminhos não devem começar com / para funcionar no GitHub Pages');
    }
    
    if (imagensGrandes.length > 0) {
        console.log('\n⚠️ IMAGENS GRANDES (podem afetar o desempenho):');
        imagensGrandes.forEach(imagem => {
            console.log(`   - ${imagem.arquivo} (${imagem.tamanho})`);
        });
        console.log('\n   DICA: Considere otimizar estas imagens para melhorar o tempo de carregamento');
    }
}

console.log('\nPara executar este script: node verificar_arquivos.js');
console.log('Para instalar o Node.js (se necessário): https://nodejs.org/');

console.log('\n=== FIM DA VERIFICAÇÃO ==='); 