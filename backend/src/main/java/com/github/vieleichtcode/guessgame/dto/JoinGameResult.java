package com.github.vieleichtcode.guessgame.dto;

import java.util.List;

public record JoinGameResult(long player_id, List<Player> players) {
}
