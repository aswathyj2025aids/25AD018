package task_manager.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
public class Task {

    @Id
    @GeneratedValue
    Long id;

    String title;

    LocalDate dueDate;

    String priority;

    boolean completed;

    @ManyToOne
    TaskList taskList;
}