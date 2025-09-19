export interface Question {
    text: string;
    id: number;
    active_player: number;
    answer_options: Answer[];
}

export interface Answer {
    text: string;
    id: number;
}

export interface Player {
    name: string;
    id: number;
    score: number;
}

export interface Results {
    question: number;
    given_answer: number;
    other_answers: AnswerResult[];
}

export interface AnswerResult {
    answer_id: number;
    player_id: number;
    correct: boolean;
    reward: number;
    new_score: number;
}

export interface JoinGameResult {
    player_id: number;
    players: Player[];
}

export interface Category {
    id: number;
    name: string;
}