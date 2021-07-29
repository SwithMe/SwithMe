package com.watch.switme.repository;

import com.watch.switme.domain.TimerDailyStudy;
import com.watch.switme.domain.TimerDailyUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface TimerDailyStudyRepository extends JpaRepository<TimerDailyStudy, Long> {


    TimerDailyStudy findByStudyIdxAndDateBetween(int study_idx, Date start, Date end);

    List<TimerDailyStudy> findTop5ByOrderByDurationDesc(); //Time형식은 ordering이 잘 될까..?
}
