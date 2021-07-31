package com.watch.switme.service;

import com.watch.switme.domain.*;
import com.watch.switme.dto.JoinStudyRequestDto;
import com.watch.switme.dto.MemberResponseDto;
import com.watch.switme.repository.StudyRepository;
import com.watch.switme.repository.UserDataExtraRepository;
import com.watch.switme.repository.UserRepository;
import com.watch.switme.repository.UserStudyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class UserStudyService {
    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private final UserStudyRepository userStudyRepository;

    private final UserDataExtraRepository userDataExtraRepository;

    @Autowired
    private final StudyRepository studyRepository;

    @Transactional
    public List<MemberResponseDto> getMemberList(Long study_idx){
        List<UserStudy> userStudyList = userStudyRepository.findByStudyIdx(study_idx);
        List<MemberResponseDto> memberResponseDtoList = new ArrayList<>();

        for(UserStudy userStudy: userStudyList){
            if(userStudy.getAmLeader() == UserYesOrNo.Y){
                continue;
            }

            Long user_idx = userStudy.getUser().getUser_idx();
            User user = userRepository.findFirstByUserIdx(user_idx);
            UserDataExtra userDataExtra = userDataExtraRepository.findFirstByUserIdx(user_idx);

            String user_image;
            if(userDataExtra == null){
                user_image = null;
            } else{
                user_image = userDataExtra.getSelfImage();
            }

            MemberResponseDto memberResponseDto = MemberResponseDto.builder()
                    .user_idx(user_idx)
                    .user_name(user.getRealname())
                    .user_image(user_image)
                    .user_manner(user.getManner_temperature())
                    .user_warning(userStudy.getWarning())
                    .build();

            memberResponseDtoList.add(memberResponseDto);
        }

        return memberResponseDtoList;
    }

    @Transactional
    public void updateWarning(Long study_idx, Long user_idx) throws Exception {
        User user = userRepository.findFirstByUserIdx(user_idx);
        UserStudy userStudy = userStudyRepository.findByUserAndStudy(study_idx, user_idx);

        int new_warning = userStudy.getWarning().intValue() + 1;
        userStudy.updateWarning(new_warning);

        int manner = user.getManner_temperature();
        if(manner-5 >= 0){
            user.setManner_temperature(manner-5);
        } else{
            user.setManner_temperature(0);
        }
    }

    @Transactional
    public void leave(Long user_study_idx){
        userStudyRepository.deleteById(user_study_idx);
    }

    @Transactional
    public Long join(Long user_idx, Long study_idx){
        User user= userRepository.findById(user_idx).get();
        Study study = studyRepository.findById(study_idx).get();
        JoinStudyRequestDto joinStudyRequestDto = JoinStudyRequestDto.builder()
                .joinDate(LocalDateTime.now())
                .study(study)
                .user(user)
                .activate(UserYesOrNo.Y)
                .amLeader(UserYesOrNo.N)
                .warning(0)
                .build();
        System.out.println(joinStudyRequestDto.getAmLeader());
        return userStudyRepository.save(joinStudyRequestDto.toEntity()).getUserStudyIdx();
    }
}
