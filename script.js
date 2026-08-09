document.addEventListener('DOMContentLoaded', () => {

    // --- SISTEMA DE CURTIDAS ---

    const likeBtn = document.getElementById('like-btn');
    const likeCountDisplay = document.getElementById('like-count');

    // Puxa curtidas salvas ou começa em 0
    let likes = parseInt(localStorage.getItem('blogLikes')) || 0;

    likeCountDisplay.textContent = likes;

    likeBtn.addEventListener('click', () => {

        likes++;

        localStorage.setItem('blogLikes', likes);

        likeCountDisplay.textContent = likes;

        // Efeito rápido de clique
        likeBtn.style.transform = "scale(0.95)";

        setTimeout(() => {
            likeBtn.style.transform = "scale(1.05)";
        }, 100);

    });


    // --- INTERATIVIDADE DO FAQ ---

    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {

        question.addEventListener('click', () => {

            const answer = question.nextElementSibling;

            if (answer.style.maxHeight) {

                answer.style.maxHeight = null;

            } else {

                answer.style.maxHeight = answer.scrollHeight + "px";

            }

        });

    });


    // --- SISTEMA DE COMENTÁRIOS COM LOCALSTORAGE ---

    const commentForm = document.getElementById('comment-form');

    const commentName = document.getElementById('comment-name');

    const commentText = document.getElementById('comment-text');

    const commentsContainer = document.getElementById('comments-container');


    // Carregar comentários já salvos
    let comments = JSON.parse(localStorage.getItem('blogComments')) || [];


    function renderComments() {

        commentsContainer.innerHTML = '';

        comments.forEach(comment => {

            const div = document.createElement('div');

            div.classList.add('comment-card');

            div.innerHTML = `
                <strong>${escapeHTML(comment.name)}</strong>
                <p>${escapeHTML(comment.text)}</p>
            `;

            commentsContainer.appendChild(div);

        });

    }


    // Prevenir scripts maliciosos nos comentários
    function escapeHTML(str) {

        return str.replace(
            /[&<>'"]/g,

            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag] || tag)
        );

    }


    // Salvar novo comentário
    commentForm.addEventListener('submit', (e) => {

        e.preventDefault();

        const newComment = {

            name: commentName.value.trim(),

            text: commentText.value.trim()

        };


        if (newComment.name && newComment.text) {

            comments.push(newComment);

            localStorage.setItem(
                'blogComments',
                JSON.stringify(comments)
            );

            renderComments();

            // Limpa o formulário
            commentForm.reset();

        }

    });


    // Inicializa a renderização
    renderComments();

});
