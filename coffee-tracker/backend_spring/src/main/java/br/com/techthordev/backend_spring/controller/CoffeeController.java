package br.com.techthordev.backend_spring.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.techthordev.backend_spring.entity.Coffee;
import br.com.techthordev.backend_spring.repository.CoffeeRepository;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class CoffeeController {

    private final CoffeeRepository coffeeRepository;

    public CoffeeController(CoffeeRepository coffeeRepository) {
        this.coffeeRepository = coffeeRepository;
    }

    @GetMapping("/coffees")
    public List<Coffee> getAllCoffees() {
        return coffeeRepository.findAll();
    }
    
}
