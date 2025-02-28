let notes = JSON.parse(localStorage.getItem('notes')) || []; // Carregar notas salvas

// Mostrar notas na tela inicial
function displayNotes() {
    const notesList = document.getElementById('notes');
    notesList.innerHTML = ''; // Limpar lista antes de preencher

    if (notes.length === 0) {
        notesList.innerHTML = '<li>Não há notas. Clique no botão "+" para adicionar uma.</li>';
    } else {
        notes.forEach((note, index) => {
            const li = document.createElement('li');
            li.textContent = note;
            li.onclick = () => editNote(index); // Ao clicar, edita a nota
            notesList.appendChild(li);
        });
    }
}

// Função para criar nova nota
document.getElementById('addNoteBtn').addEventListener('click', () => {
    // Alternar para tela de criação de nota
    document.getElementById('mainScreen').style.display = 'none';
    document.getElementById('editScreen').style.display = 'block';
    document.getElementById('editNoteArea').textContent = ''; // Limpar área de edição
});

// Função para salvar nova nota
document.getElementById('goBackBtn').addEventListener('click', () => {
    const noteContent = document.getElementById('editNoteArea').textContent.trim(); // Obter conteúdo da área de edição
    if (noteContent) {
        notes.push(noteContent); // Adicionar nova nota
        localStorage.setItem('notes', JSON.stringify(notes)); // Salvar no localStorage
        displayNotes(); // Atualizar lista de notas
    }
    goBackToMainScreen(); // Voltar para a tela inicial
});

// Função para editar uma nota
function editNote(index) {
    document.getElementById('mainScreen').style.display = 'none';
    document.getElementById('editScreen').style.display = 'block';
    document.getElementById('editNoteArea').textContent = notes[index]; // Carregar a nota para edição
    document.getElementById('goBackBtn').onclick = () => {
        saveEditedNote(index); // Salvar automaticamente ao voltar
    };
}

// Função para salvar a nota editada
function saveEditedNote(index) {
    const noteContent = document.getElementById('editNoteArea').textContent.trim(); // Obter conteúdo
    if (noteContent) {
        notes[index] = noteContent; // Substituir a nota editada
        localStorage.setItem('notes', JSON.stringify(notes)); // Salvar no localStorage
        displayNotes(); // Atualizar lista de notas
    }
    goBackToMainScreen(); // Voltar para a tela inicial
}

// Função para voltar à tela inicial
function goBackToMainScreen() {
    document.getElementById('editScreen').style.display = 'none';
    document.getElementById('mainScreen').style.display = 'block';
}

// Exibir notas na tela inicial ao carregar
window.onload = displayNotes;
