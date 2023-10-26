package com.example.simpledms.service.normal;

import com.example.simpledms.model.entity.normal.CinemaFaq;
import com.example.simpledms.repository.normal.CinemaFaqRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * packageName : com.example.simpledms.service.normal
 * fileName : CinemaFaqService
 * author : GGG
 * date : 2023-10-25
 * description :
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-10-25         GGG          최초 생성
 */
@Service
public class CinemaFaqService {

    @Autowired
    CinemaFaqRepository cinemaFaqRepository; // DI

    //    전체 조회 + like 검색 + 정렬
    public Page<CinemaFaq> findAllByQuestionContaining(String question, Pageable pageable) {
        Page<CinemaFaq> page
                = cinemaFaqRepository
                .findAllByQuestionContainingOrderBySortOrderDesc(question, pageable);

        return page;
    }

    //    저장함수(수정함수)
    public CinemaFaq save(CinemaFaq cinemaFaq) {

        CinemaFaq cinemaFaq2 = cinemaFaqRepository.save(cinemaFaq);

        return cinemaFaq2;
    }

    //    상세조회(1건조회)
    public Optional<CinemaFaq> findById(int cfno) {
        Optional<CinemaFaq> optionalCinemaFaq
                = cinemaFaqRepository.findById(cfno);

        return optionalCinemaFaq;
    }

    //    삭제함수
    public boolean removeById(int cfno) {
        if(cinemaFaqRepository.existsById(cfno)) { // no 있는지 확인
            cinemaFaqRepository.deleteById(cfno);  // 삭제 진행
            return true;
        }
        return false;
    }
}