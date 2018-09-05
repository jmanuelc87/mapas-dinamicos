package gob.siap.mapas;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

/*
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
 */
@SpringBootApplication
public class MapasApplication extends SpringBootServletInitializer {

    public static void main(String[] args) {
        SpringApplication.run(MapasApplication.class, args);
    }
}
