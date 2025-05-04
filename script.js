document.addEventListener('DOMContentLoaded', function() {
    const refuseBtn = document.getElementById('refuse-btn');
    const acceptBtn = document.getElementById('accept-btn');
    const result = document.getElementById('result');
    const container = document.querySelector('.container');
    
    // Criar elemento de áudio
    const backgroundMusic = new Audio('./audio/Fim_Ou_Intervalo___De_Trás_Pra_Frente___Faz_Tempo__Ao_Vivo_Em_Brasília_(128k).m4a');
    backgroundMusic.loop = true; // Loop da música
    backgroundMusic.volume = 0.7; // Volume a 70%
    
    // Function to move the refuse button to a random position
    function moveButton() {
        // Get viewport dimensions
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        // Get container dimensions and position
        const containerRect = container.getBoundingClientRect();
        
        // Calculate available space within container
        const maxX = containerRect.width - refuseBtn.offsetWidth;
        const maxY = containerRect.height - refuseBtn.offsetHeight;
        
        // Generate random position within the container
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);
        
        // Apply the new position
        refuseBtn.style.position = 'absolute';
        refuseBtn.style.left = `${randomX}px`;
        refuseBtn.style.top = `${randomY}px`;
        
        // Ensure button stays within container
        if (randomX < 0) refuseBtn.style.left = '0px';
        if (randomY < 0) refuseBtn.style.top = '0px';
    }
    
    // Add window resize listener to reposition button if needed
    window.addEventListener('resize', function() {
        if (refuseBtn.style.position === 'absolute') {
            moveButton();
        }
    });
    
    // Move the button when the mouse enters it or when clicked
    refuseBtn.addEventListener('mouseenter', moveButton);
    refuseBtn.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent default click behavior
        moveButton();
    });
    
    // Also move button on touch start for mobile devices
    refuseBtn.addEventListener('touchstart', function(e) {
        e.preventDefault();
        moveButton();
    });
    
    // Handle accept button click
    acceptBtn.addEventListener('click', function() {
        result.textContent = "Ótimo! Carregando opções...";
        result.style.color = "#4caf50";
        
        // Make the buttons disappear
        document.querySelector('.buttons').style.display = 'none';
        
        // Iniciar a música
        backgroundMusic.play()
            .catch(e => console.log("Erro ao reproduzir música:", e));
        
        // Salvar estado da música em sessionStorage
        sessionStorage.setItem('musicPlaying', 'true');
        sessionStorage.setItem('audioPath', './audio/Fim_Ou_Intervalo___De_Trás_Pra_Frente___Faz_Tempo__Ao_Vivo_Em_Brasília_(128k).m4a');
        
        // Show a confetti effect
        celebrateAccept();
        
        // Redirect to choices page after a short delay
        setTimeout(() => {
            window.location.href = 'choices.html';
        }, 2000);
    });
    
    // Simple celebration function
    function celebrateAccept() {
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
            confetti.style.animationDelay = Math.random() * 2 + 's';
            
            // Random color
            const colors = ['#ff4b8a', '#4caf50', '#ffeb3b', '#42a5f5', '#e040fb'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.backgroundColor = randomColor;
            
            container.appendChild(confetti);
            
            // Remove confetti after animation ends
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }
    }
    
    // Add some CSS for the confetti
    const style = document.createElement('style');
    style.textContent = `
        .confetti {
            position: absolute;
            width: 10px;
            height: 10px;
            background-color: var(--color);
            top: -10px;
            opacity: 0;
            animation: fall 5s linear forwards;
            z-index: 100;
        }
        
        @keyframes fall {
            0% {
                top: -10px;
                opacity: 1;
                transform: translateX(0) rotate(0deg);
            }
            100% {
                top: 100%;
                opacity: 0;
                transform: translateX(100px) rotate(360deg);
            }
        }
    `;
    document.head.appendChild(style);
}); 