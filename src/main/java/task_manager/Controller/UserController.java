package task_manager.Controller;

import task_manager.Models.User;
import task_manager.Services.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserServices userServices;

    // CREATE
    @PostMapping("/create")
    ResponseEntity<User> create(@RequestBody User user) {
        return new ResponseEntity<>(
                userServices.createuser(user),
                HttpStatus.CREATED
        );
    }

    // READ
    @GetMapping("/getall")
    ResponseEntity<List<User>> getall() {
        return new ResponseEntity<>(
                userServices.getalluser(),
                HttpStatus.OK
        );
    }

    // UPDATE
    @PutMapping("/update")
    ResponseEntity<User> update(@RequestBody User user) {
        return new ResponseEntity<>(
                userServices.updateuser(user),
                HttpStatus.ACCEPTED
        );
    }

    // DELETE
    @DeleteMapping("/delete/{id}")
    ResponseEntity<String> delete(@PathVariable long id) {
        userServices.deleteUser(id);

        return new ResponseEntity<>(
                "User deleted successfully",
                HttpStatus.OK
        );
    }
}