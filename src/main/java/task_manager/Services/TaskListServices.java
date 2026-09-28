package task_manager.Services;

import task_manager.Models.TaskList;
import task_manager.Models.User;
import task_manager.Repository.TaskListRepository;
import task_manager.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskListServices {

    @Autowired
    private TaskListRepository taskListRepository;

    @Autowired
    private UserRepository userRepository;

    public TaskList createTaskList(TaskList taskList, long userId) {

        User user = userRepository.findById(userId).orElse(null);

        taskList.setUser(user);

        return taskListRepository.save(taskList);
    }

    public List<TaskList> getAllTaskLists() {
        return taskListRepository.findAll();
    }

    public TaskList updateTaskList(TaskList taskList) {
        return taskListRepository.save(taskList);
    }

    public void deleteTaskList(long id) {
        taskListRepository.deleteById(id);
    }
}