package br.com.techthordev.backend_spring;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import br.com.techthordev.backend_spring.entity.Coffee;
import br.com.techthordev.backend_spring.repository.CoffeeRepository;

@SpringBootApplication
public class BackendSpringApplication {

	private static final Logger logger = LoggerFactory.getLogger(BackendSpringApplication.class);

	public static void main(String[] args) {
		SpringApplication.run(BackendSpringApplication.class, args);
	}

	@Bean
	public CommandLineRunner run(CoffeeRepository coffeeRepository) {
		return (args) -> {
			// Logging for system records
			logger.info("Executing database query...");

			// Direct output for quick comparison
			System.out.println("--- RAW DATA OUTPUT ---");

			List<Coffee> coffees = coffeeRepository.findAll();

			for (Coffee coffee : coffees) {
				System.out.printf("Coffee: %d | %s | %.2f%n",
						coffee.getId(),
						coffee.getType(),
						coffee.getPrice());
			}

			System.out.println("-----------------------");

			// Logging for system records
			logger.info("Query finished.");
		};
	}

}
