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
    public ResponseEntity<List<PostItemDTO>> getAll() {
        var result = postService.get();
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    // Endpoint to create a new post
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<PostItemDTO> create (@Valid @ModelAttribute PostCreateDTO model) {
        var savedPost = postService.create(model);
        return new ResponseEntity<>(savedPost, HttpStatus.OK);
    }

    // Endpoint to get a specific post by id
    @GetMapping("/{productId}")
    public ResponseEntity<PostItemDTO> getById(@PathVariable int productId) {
        var result = postService.getById(productId);
        if (result == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    // Add other endpoints like update and delete as needed
}
