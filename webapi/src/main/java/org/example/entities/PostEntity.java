package org.example.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import jakarta.persistence.*;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="tbl_posts")
public class PostEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(length = 50, nullable = false)
    private String title;
    @Column(length = 4000)
    private String content;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    private boolean isDelete;

    @Column(name = "likes")
    private int likes = 0; // Initializing likes with default value 0

    @OneToMany(mappedBy="post")
    private List<PostImageEntity> postImages;

    @OneToMany(mappedBy = "post")
    private List<UserPostEntity> userPosts = new ArrayList<>();
}
