package com.bkfruits;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class BKFruitsApplication {

    public static void main(String[] args) {
        SpringApplication.run(BKFruitsApplication.class, args);
    }
}