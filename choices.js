document.addEventListener('DOMContentLoaded', function() {
    const options = document.querySelectorAll('.option');
    const chooseButtons = document.querySelectorAll('.choose-btn');
    const successScreen = document.getElementById('success-screen');
    const chosenImg = document.getElementById('chosen-img');
    const backBtn = document.getElementById('back-btn');
    const successContent = document.querySelector('.success-content');
    const toggleSoundBtn = document.getElementById('toggle-sound');
    const soundIcon = document.getElementById('sound-icon');
    const volumeSlider = document.getElementById('volume-slider');
    
    // Variável global para a música
    let backgroundMusic;
    
    // Verificar se a música deve estar tocando (vindo da página anterior)
    if (sessionStorage.getItem('musicPlaying') === 'true') {
        // Obter o caminho do áudio do sessionStorage ou usar o padrão
        const audioPath = sessionStorage.getItem('audioPath') || 'audio/Fim_Ou_Intervalo___De_Trás_Pra_Frente___Faz_Tempo__Ao_Vivo_Em_Brasília_(128k).m4a';
        
        // Criar elemento de áudio e iniciar a música
        backgroundMusic = new Audio(audioPath);
        backgroundMusic.loop = true;
        backgroundMusic.volume = 0.7;
        
        // Tentar reproduzir a música - pode exigir interação do usuário em alguns navegadores
        const playMusic = function() {
            backgroundMusic.play()
                .catch(e => {
                    console.log("Erro ao reproduzir música, tentando novamente em breve:", e);
                    // Em alguns navegadores, é necessário um evento de usuário para tocar áudio
                    document.body.addEventListener('click', function playOnce() {
                        backgroundMusic.play();
                        document.body.removeEventListener('click', playOnce);
                    }, { once: true });
                });
        };
        
        playMusic();
    }
    
    // Controle de volume
    if (backgroundMusic) {
        // Botão para habilitar/desabilitar som
        toggleSoundBtn.addEventListener('click', function() {
            if (backgroundMusic.muted) {
                backgroundMusic.muted = false;
                soundIcon.className = 'fas fa-volume-up';
            } else {
                backgroundMusic.muted = true;
                soundIcon.className = 'fas fa-volume-mute';
            }
        });
        
        // Controle de volume
        volumeSlider.addEventListener('input', function() {
            backgroundMusic.volume = this.value / 100;
            
            // Atualizar ícone baseado no volume
            if (this.value == 0) {
                soundIcon.className = 'fas fa-volume-mute';
                backgroundMusic.muted = true;
            } else if (this.value < 50) {
                soundIcon.className = 'fas fa-volume-down';
                backgroundMusic.muted = false;
            } else {
                soundIcon.className = 'fas fa-volume-up';
                backgroundMusic.muted = false;
            }
        });
    } else {
        // Se não houver música, ocultar os controles
        document.querySelector('.sound-control').style.display = 'none';
    }
    
    // Add click event for each choose button
    chooseButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get parent option element
            const option = this.closest('.option');
            // Get choice data
            const choice = option.getAttribute('data-choice');
            // Get image source
            const imgSrc = option.querySelector('img').src;
            // Get title
            const title = option.querySelector('h2').textContent;
            
            // Set chosen image
            chosenImg.src = imgSrc;
            chosenImg.alt = title;
            
            // Update success message with title
            document.querySelector('.success-content h1').textContent = `Ótima escolha! ${title}`;
            
            // Show success screen with animation
            successScreen.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
            
            // Create fireworks
            createFireworks(50);
            
            // Scroll to top if on mobile
            window.scrollTo(0, 0);
        });
    });
    
    // Back button event
    backBtn.addEventListener('click', function() {
        successScreen.classList.add('hidden');
        document.body.style.overflow = ''; // Re-enable scrolling
        
        // Remove fireworks
        document.querySelectorAll('.firework').forEach(firework => {
            firework.remove();
        });
        
        // Reset firework intervals
        if (window.fireworkInterval) {
            clearInterval(window.fireworkInterval);
        }
    });
    
    // Function to create fireworks
    function createFireworks(count) {
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const firework = document.createElement('div');
                firework.classList.add('firework');
                
                // Random position
                const x = Math.random() * 200 - 100; // Range: -100 to 100
                const y = Math.random() * 200 - 100; // Range: -100 to 100
                
                // Random color
                const colors = ['#ff4b8a', '#4caf50', '#ffeb3b', '#42a5f5', '#e040fb', '#ff5722', '#00bcd4'];
                const randomColor = colors[Math.floor(Math.random() * colors.length)];
                
                // Random delay
                const delay = Math.random() * 1.5;
                
                // Apply styles
                firework.style.setProperty('--x', `${x}px`);
                firework.style.setProperty('--y', `${y}px`);
                firework.style.backgroundColor = randomColor;
                firework.style.animationDelay = `${delay}s`;
                
                // Random position within success content
                const contentRect = successContent.getBoundingClientRect();
                
                // Position firework
                firework.style.left = `${Math.random() * contentRect.width}px`;
                firework.style.top = `${Math.random() * contentRect.height}px`;
                
                // Add to success content
                successContent.appendChild(firework);
                
                // Remove after animation
                setTimeout(() => {
                    if (firework.parentNode) {
                        firework.remove();
                    }
                }, 2000 + delay * 1000);
            }, Math.random() * 1500); // Stagger firework creation
        }
    }
    
    // Function to create multiple firework bursts over time
    function continuousFireworks() {
        createFireworks(10);
        
        // Set interval for continuous fireworks
        if (window.fireworkInterval) {
            clearInterval(window.fireworkInterval);
        }
        
        window.fireworkInterval = setInterval(() => {
            if (!successScreen.classList.contains('hidden')) {
                createFireworks(8);
            } else {
                clearInterval(window.fireworkInterval);
            }
        }, 2000);
    }
    
    // Start continuous fireworks when the success screen is shown
    successScreen.addEventListener('transitionend', function(e) {
        if (e.propertyName === 'opacity' && !successScreen.classList.contains('hidden')) {
            continuousFireworks();
        }
    });
    
    // Handle option hover effect for touch devices
    if ('ontouchstart' in window) {
        options.forEach(option => {
            option.addEventListener('touchstart', function() {
                this.classList.add('touch-hover');
            });
            
            option.addEventListener('touchend', function() {
                this.classList.remove('touch-hover');
            });
        });
    }
    
    // Handle window resize to reposition fireworks
    window.addEventListener('resize', function() {
        if (!successScreen.classList.contains('hidden')) {
            document.querySelectorAll('.firework').forEach(firework => {
                const contentRect = successContent.getBoundingClientRect();
                firework.style.left = `${Math.random() * contentRect.width}px`;
                firework.style.top = `${Math.random() * contentRect.height}px`;
            });
        }
    });
}); 