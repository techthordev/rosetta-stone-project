package br.com.techthordev.backend_spring.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.techthordev.backend_spring.entity.Coffee;

@Repository
public interface CoffeeRepository extends JpaRepository<Coffee, Long> {
}