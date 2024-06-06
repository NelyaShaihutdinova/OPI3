import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class ManagerDBTest {
    Point point;

    @BeforeEach
    public void testBefore() {
        point = new Point(1, 2, 3);
    }

    @Test
    public void test() {
        assertEquals(1, point.getX());
        point.setX(3);
        assertEquals(3,point.getX());
    }
}