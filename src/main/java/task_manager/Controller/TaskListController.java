package task_manager.Controller;

import task_manager.Models.TaskList;
import task_manager.Services.TaskListServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasklists")
public class TaskListController {

    @Autowired
    private TaskListServices taskListServices;

    @PostMapping("/create/{userId}")
    ResponseEntity<TaskList> create(
            @RequestBody TaskList taskList,
            @PathVariable long userId) {

        return new ResponseEntity<>(
                taskListServices.createTaskList(taskList, userId),
                HttpStatus.CREATED
        );
    }
    @GetMapping("/getall")
    ResponseEntity<List<TaskList>> getall() {
        return new ResponseEntity<>(
                taskListServices.getAllTaskLists(),
                HttpStatus.OK
        );
    }

    @PutMapping("/update")
    ResponseEntity<TaskList> update(@RequestBody TaskList taskList) {
        return new ResponseEntity<>(
                taskListServices.updateTaskList(taskList),
                HttpStatus.ACCEPTED
        );
    }
    @DeleteMapping("/delete/{id}")
    ResponseEntity<String> delete(@PathVariable long id) {
        taskListServices.deleteTaskList(id);

        return new ResponseEntity<>(
                "TaskList deleted successfully",
                HttpStatus.OK
        );
    }
}