import { useHistory } from 'react-router-dom';
import { FormEvent, useState } from 'react';

//import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../../assets/images/logo.jpg';
import googleIconImg from '../../assets/images/google-icon.svg';
import peoples from '../../assets/images/peoples.jpg';

import { database } from '../../services/firebase';

import { Button } from '../../components/Button';
import { useAuth } from '../../hooks/useAuth';

import './styles.scss';

export function Home() {
    const history = useHistory();
    const { user, signInWithGoogle } = useAuth();
    const [roomCode, setRoomCode] = useState('');

    async function handleCreateRoom() {
        if (!user) {
            await signInWithGoogle()
        }
        history.push('/rooms/new');
    }

    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault();

        if (roomCode.trim() === '') {
            return;
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        if(!roomRef.exists()){
            alert("Esta Sala nao existe.");
            return;
        }

        if(roomRef.val().endedAt){
            alert("Room already closed.");
            return;
        }

        history.push(`rooms/${roomCode}`);
    }

    return (
        <div id="page-auth">
            <aside>
                <img src={peoples} alt="Ilustração de pessoas tirando dúvidas" />
                <strong>Crie salas de Perguntas &amp; Respostas ao-vivo</strong>
                <p>Tire as suas dúvidas em tempo real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Letmeask" />
                    <button onClick={handleCreateRoom} className="create-room">
                        <img src={googleIconImg} alt="Logo o Google" />
                        Crie sua sala como Google
                    </button>
                    <div className="separator">ou entre em uma sala </div>
                    <form onSubmit={handleJoinRoom}>
                        <input
                            type="text"
                            placeholder="Digite o código da sala"
                            onChange={event => setRoomCode(event.target.value)}
                            value={roomCode}
                        />
                        <Button type="submit">
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    );
}