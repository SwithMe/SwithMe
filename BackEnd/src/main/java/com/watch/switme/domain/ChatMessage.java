package com.watch.switme.domain;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

@ToString(exclude = "room")
@Getter
@NoArgsConstructor
@Table(name="chat_message")
@Entity
public class ChatMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "message_idx", nullable = false)
    private Long messageIdx;

    @Column(name = "message", nullable = false)
    private String message;

    @CreatedDate
    @Column(name = "time", nullable = false)
    private LocalDateTime time;

    @ManyToOne
    @JoinColumn(name="sender_idx")
    private User sender;

    @ManyToOne
    @JoinColumn(name="room_idx")
    private ChatRoom room;

    @Column(columnDefinition = "TINYINT")
    private int check;

    @Builder
    public ChatMessage(String message, User sender, ChatRoom room){
        this.message = message;
        this.sender = sender;
        this.room = room;
        this.check = 0;
    }

    public void checkUpdate(int check){
        this.check = check;
    }

//    @PrePersist
//    public void chatTime(){
//        this.time = LocalDateTime.now();
//    }
}