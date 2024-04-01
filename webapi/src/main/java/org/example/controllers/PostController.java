package org.example.controllers;

import org.example.entities.PostEntity;
import org.example.repositories.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/posts")
public class PostController {

    @Autowired
    private PostRepository postRepository;

    // Endpoint to get all posts
    @GetMapping
    public ResponseEntity<List<PostEntity>> getAll() {
        List<PostEntity> posts = postRepository.findAll();
        return new ResponseEntity<>(posts, HttpStatus.OK);
    }

    // Endpoint to create a new post
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<PostEntity> create (@RequestBody PostEntity post) {
        PostEntity savedPost = postRepository.save(post);
        return new ResponseEntity<>(savedPost, HttpStatus.CREATED);
    }

    // Endpoint to get a specific post by id
    @GetMapping("/{id}")
    public ResponseEntity<PostEntity> getPostById(@PathVariable("id") int id) {
        PostEntity post = postRepository.findById(id)
                .orElse(null); // Handle if post not found
        if (post != null) {
            return new ResponseEntity<>(post, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Add other endpoints like update and delete as needed
}
