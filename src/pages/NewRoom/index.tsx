import { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import peoples from '../../assets/images/peoples.jpg';
import logoImg from '../../assets/images/logo.jpg';

import { Button } from '../../components/Button';
import { database } from '../../services/firebase';
import { useAuth } from '../../hooks/useAuth';

import "./styles.scss";

export function NewRoom() {

    const { user } = useAuth();
    
    const history = useHistory();

    const [newRoom, setNewRoom] = useState('')

    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault();

        if (newRoom.trim() === '') {
            return;
        }

        const roomRef = database.ref('rooms');

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id,
        })

        history.push(`/rooms/${firebaseRoom.key}`)
    }

    return (
        <div id="page-auth">
            <aside>
                <img src={peoples} alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Crie salas de Perguntas &amp; Repostas ao-vivo</strong>
                <p>Tire as dúvidas em tempo real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Letmeask" />
                    <h2>Criar uma nova Sala</h2>
                    <form onSubmit={handleCreateRoom}>
                        <input
                            type="text"
                            placeholder="Nome da sala"
                            onChange={event => setNewRoom(event.target.value)}
                            value={newRoom}
                        />
                        <Button type="submit">
                            Criar na sala
                        </Button>
                    </form>
                    <p>Quer entrar em uma sala existente?<Link to="/">Clique aqui</Link></p>
                </div>
            </main>
        </div>
    )
}