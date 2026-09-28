package task_manager.Services;

import task_manager.Models.User;
import task_manager.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServices {

    @Autowired
    private UserRepository userRepository;

    public User createuser(User user) {
        return userRepository.save(user);
    }

    public List<User> getalluser() {
        return userRepository.findAll();
    }

    public User updateuser(User user) {
        return userRepository.save(user);
    }

    public void deleteUser(long id) {
        userRepository.deleteById(id);
    }
}