package com.watch.switme.controller;

import com.watch.switme.domain.User;
import com.watch.switme.domain.UserDataExtra;
import com.watch.switme.dto.UserInfoResponseDto;
import com.watch.switme.dto.UserStudyListResponseDto;
import com.watch.switme.dto.UserTimerLogResponseDto;
import com.watch.switme.dto.UserUpdateDto;
import com.watch.switme.service.MyPageService;
import com.watch.switme.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/mypage")
public class MyPageController {
    private final MyPageService myPageService;
    private final UserService userService;

    @GetMapping("/user/{user_idx}")
    public UserInfoResponseDto getUserInfo(@PathVariable("user_idx") Long user_idx){
        User user = userService.findByUserIdx(user_idx);
        UserDataExtra userDataExtra = userService.findExtraByUserIdx(user_idx);

        UserInfoResponseDto userInfoResponseDto = UserInfoResponseDto.builder()
                .user_idx(user_idx)
                .user_name(user.getRealname())
                .user_email(user.getEmail())
                .user_image(userDataExtra.getSelfImage())
                .build();

        return userInfoResponseDto;
    }

    @GetMapping("/study_list/{user_idx}")
    public List<UserStudyListResponseDto> getStudyList(@PathVariable("user_idx") Long user_idx){
        return myPageService.getUserStudyList(user_idx);
    }

    @GetMapping("/timer_log/{user_idx}")
    public List<UserTimerLogResponseDto> getTimerLog(@PathVariable("user_idx") Long user_idx){
        return myPageService.getUserTimerLog(user_idx);
    }

    @PostMapping("/user_update")
    public void userUpdate(UserUpdateDto userUpdateDto){
        try{
            myPageService.updateUser(userUpdateDto);
        }catch (Exception e){
        }
    }
}
