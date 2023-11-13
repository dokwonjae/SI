package com.example.simpledms.service.basic;

import com.example.simpledms.model.entity.basic.Emp;
import com.example.simpledms.model.entity.basic.Emp;
import com.example.simpledms.repository.basic.EmpRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * packageName : com.example.simpledms.service.basic
 * fileName : EmpService
 * author : GGG
 * date : 2023-10-23
 * description : 부서 서비스
 * 요약 :
 * <p>
 * ===========================================================
 * DATE            AUTHOR             NOTE
 * —————————————————————————————
 * 2023-10-23         GGG          최초 생성
 */
@Service
public class EmpService {

    @Autowired
    EmpRepository empRepository; // DI

    //    전체 조회 + 페이징
    public Page<Emp> findAll(Pageable pageable) {
        Page<Emp> page = empRepository.findAll(pageable);

        return page;
    }

    //    dname like 조회 + 페이징
    public Page<Emp> findAllByEnameContaining(String dname, Pageable pageable) {
        Page<Emp> page
                = empRepository.findAllByEnameContaining(dname, pageable);

        return page;
    }

    //      저장함수(수정함수)
    public Emp save(Emp emp) {

        Emp emp2 = empRepository.save(emp);

        return emp2;
    }

    //    상세조회(1건조회)
    public Optional<Emp> findById(int eno) {
        Optional<Emp> optionalEmp
                = empRepository.findById(eno);

        return optionalEmp;
    }

    //    삭제함수
    public boolean removeById(int eno) {
        if(empRepository.existsById(eno)) { // eno 있는지 확인
            empRepository.deleteById(eno); // 삭제 진행
            return true;
        }
        return false;
    }
}