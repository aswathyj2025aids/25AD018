package task_manager.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class TaskList {

    @Id
    @GeneratedValue
    Long id;

    String name;

    @ManyToOne
    User user;
}