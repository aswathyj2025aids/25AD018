package task_manager.Services;

import task_manager.Models.Task;
import task_manager.Models.TaskList;
import task_manager.Repository.TaskRepository;
import task_manager.Repository.TaskListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskServices {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private TaskListRepository taskListRepository;


    public Task createTask(Task task) {

        if (!task.getPriority().equals("LOW") &&
                !task.getPriority().equals("MEDIUM") &&
                !task.getPriority().equals("HIGH")) {

            throw new IllegalArgumentException(
                    "Priority must be LOW, MEDIUM, or HIGH"
            );
        }

        if (task.getTaskList() != null) {

            TaskList taskList = taskListRepository.findById(
                    task.getTaskList().getId()
            ).orElse(null);

            task.setTaskList(taskList);
        }

        return taskRepository.save(task);
    }


    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public List<Task> getOverdueTasks() {

        List<Task> tasks = taskRepository.findAll();
        List<Task> overdueTasks = new java.util.ArrayList<>();

        for (Task task : tasks) {

            if (task.getDueDate().isBefore(java.time.LocalDate.now())
                    && !task.isCompleted()) {

                overdueTasks.add(task);
            }
        }

        return overdueTasks;
    }

    public Task updateTask(Task task) {

        if (!task.getPriority().equals("LOW") &&
                !task.getPriority().equals("MEDIUM") &&
                !task.getPriority().equals("HIGH")) {

            throw new IllegalArgumentException(
                    "Priority must be LOW, MEDIUM, or HIGH"
            );
        }

        return taskRepository.save(task);
    }

    public List<Task>
    getTodayTasks() {

        List<Task> tasks = taskRepository.findAll();
        List<Task> todayTasks = new java.util.ArrayList<>();

        for (Task task : tasks) {

            if (task.getDueDate().equals(java.time.LocalDate.now())) {

                todayTasks.add(task);
            }
        }

        return todayTasks;
    }

    public void deleteTask(long id) {
        taskRepository.deleteById(id);
    }
}