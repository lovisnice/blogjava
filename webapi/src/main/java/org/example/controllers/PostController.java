package org.example.controllers;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.example.dto.post.PostCreateDTO;
import org.example.dto.post.PostItemDTO;
import org.example.entities.PostEntity;
import org.example.repositories.PostRepository;
import org.example.services.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("api/posts")
public class PostController {
    private final PostService postService;
    private final PostRepository postRepository;


    // Endpoint to get all posts
    @GetMapping
    public ResponseEntity<List<PostEntity>> getAll() {
        List<PostEntity> posts = postRepository.findAll();
        return new ResponseEntity<>(posts, HttpStatus.OK);
    }

    // Endpoint to create a new post
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<PostItemDTO> create (@Valid @ModelAttribute PostCreateDTO model) {
        var savedPost = postService.create(model);
        return new ResponseEntity<>(savedPost, HttpStatus.OK);
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
