package com.lps.back;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.runner.ApplicationContextRunner;
import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class BackApplicationTests {

    @Test
    void contextLoads() {
    }

    @Test
    void testMain() {
		BackApplication.main(new String[] {});
    }

}
