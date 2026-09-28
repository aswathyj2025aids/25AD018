package task_manager.Controller;

import task_manager.Models.Task;
import task_manager.Services.TaskServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
public class TaskController {

    @Autowired
    private TaskServices taskServices;

    @PostMapping("/create")
    ResponseEntity<Task> create(@RequestBody Task task) {
        return new ResponseEntity<>(
                taskServices.createTask(task),
                HttpStatus.CREATED
        );
    }

    @GetMapping("/getall")
    ResponseEntity<List<Task>> getall() {
        return new ResponseEntity<>(
                taskServices.getAllTasks(),
                HttpStatus.OK
        );
    }

    @GetMapping("/overdue")
    ResponseEntity<List<Task>> overdue() {
        return new ResponseEntity<>(
                taskServices.getOverdueTasks(),
                HttpStatus.OK
        );
    }

    @PutMapping("/update")
    ResponseEntity<Task> update(@RequestBody Task task) {
        return new ResponseEntity<>(
                taskServices.updateTask(task),
                HttpStatus.ACCEPTED
        );
    }

    @DeleteMapping("/delete/{id}")
    ResponseEntity<String> delete(@PathVariable long id) {
        taskServices.deleteTask(id);

        return new ResponseEntity<>(
                "Task deleted successfully",
                HttpStatus.OK
        );
    }
    @ExceptionHandler(IllegalArgumentException.class)
    ResponseEntity<String> handleException(IllegalArgumentException e) {

        return new ResponseEntity<>(
                e.getMessage(),
                HttpStatus.BAD_REQUEST
        );
    }
}