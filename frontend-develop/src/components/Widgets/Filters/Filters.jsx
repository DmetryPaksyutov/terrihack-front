import React, {useEffect, useState} from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Input, Checkbox, Select, InputNumber, Button } from 'antd';
import st from './Filters.module.css';
import {useMediaQuery} from "react-responsive";
import { FilterOutlined, CloseOutlined } from '@ant-design/icons';


const { Option } = Select;

const SearchForm = ({ refData }) => {
    const { reset, handleSubmit, control, setValue, watch } = useForm();
    const isMobile = useMediaQuery({ maxWidth: 577 });
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };
    //const formData = watch();

    const onSubmit = (data) => {
        console.log(data);
    };

   //const dispatch = useDispatch();
    useEffect(() => {
        //if (onFormChange) {
            //onFormChange(formData);
            //dispatch(setFilters(formData));
        //}
        if (refData.current) {
            refData.current = watch;
        }

    }, [refData, watch]);

    return (
        <div>{isMobile && ( <Button
            className={st.butOpenFilters}
            icon={<FilterOutlined />}
            onClick={toggleVisibility}
            style={{ display: isVisible ? 'none' : 'block', width: "60px" }}
        /> ) }
       <div className={`${st.formBlock} ${isMobile && st.formBlock__mobile} ${isMobile && !isVisible && st.noVisible}`}>
           <form onSubmit={handleSubmit(onSubmit)} >
           {isMobile && (<div className={st.butClose_container}><Button
               icon={<CloseOutlined />}
               onClick={toggleVisibility}
               shape="circle"
               type="text"
               className={st.butClose_container}
               onMouseEnter={(e) => e.target.style.backgroundColor = '#e6f7ff'}
               onMouseLeave={(e) => e.target.style.backgroundColor = '#f5f5f5'}
           /></div>)}
                {/* Поле для only_in_resume */}
                <div>
                    <Controller
                        name="only_in_resume"
                        control={control}
                        defaultValue={false}
                        render={({ field }) => (
                            <Checkbox {...field}>{'Искать только в тексте'}</Checkbox>
                        )}
                    />
                </div>

                {/* Поле для only_in_company_name */}
                <div>
                    <Controller
                        name="only_in_company_name"
                        control={control}
                        defaultValue={false}
                        render={({ field }) => (
                            <Checkbox {...field}>{'Искать только в названии компании'}</Checkbox>
                        )}
                    />
                </div>

                {/* Поле для only_in_description */}
                <div>
                    <Controller
                        name="only_in_description"
                        control={control}
                        defaultValue={false}
                        render={({ field }) => (
                            <Checkbox {...field}>{'Искать только в описании'}</Checkbox>
                        )}
                    />
                </div>

                {/* Поле для exclude_words */}
                <div>
                    <Controller
                        name="exclude_words"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <Input {...field} placeholder={'Исключить слова'} />
                        )}
                    />
                </div>

                {/* Поле для region */}
                <div>
                    <Controller
                        name="region"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <Input {...field} placeholder={'Регион'} />
                        )}
                    />
                </div>

                {/* Поле для salary_level */}
                <div>
                    <Controller
                        name="salary_level"
                        control={control}
                        render={({ field }) => (
                            <Input {...field} placeholder={'Минимальный уровень дохода'} />
                        )}
                    />
                </div>

                {/* Поле для only_with_salary */}
                <div>
                    <Controller
                        name="only_with_salary"
                        control={control}
                        defaultValue={false}
                        render={({ field }) => (
                            <Checkbox {...field}>{'Только с уровнем дохода'}</Checkbox>
                        )}
                    />
                </div>

                {/* Поле для education_level */}
                <div>
                    <label className={st.lb}>Уровень образования</label>
                    <Controller
                        name="education_level"
                        control={control}
                        defaultValue=""

                        render={({ field }) => (
                            <Select {...field} placeholder={'Уровень образования'} className={st.blockList}>
                                <Option value="none">{'Не имеет значения'}</Option>
                                <Option value="highschool">{'Среднее'}</Option>
                                <Option value="bachelor">{'Высшее'}</Option>
                            </Select>
                        )}
                    />
                </div>

                {/* Поле для experience */}
           <div>
               <label className={st.lb}>опыт работы</label>
               <Controller
                   name="experience"
                   control={control}
                   defaultValue=""
                   render={({field}) => (
                       <Select {...field} placeholder={'Опыт работы'} className={st.blockList}>
                           <Option value="none">{'Нет'}</Option>
                           <Option value="1-3">{'1-3 года'}</Option>
                           <Option value="3-6">{'3-6 лет'}</Option>
                           <Option value="6+">{'6+ лет'}</Option>
                       </Select>
                   )}
               />
           </div>

           {/* Поле для employment_type */}
           <div>
               <label className={st.lb}>Тип занятости</label>
               <Controller
                   name="employment_type"
                   control={control}
                   defaultValue=""
                   render={({field}) => (
                       <Select {...field} placeholder={'Тип занятости'} className={st.blockList}>
                           <Option value="fullTime">{'Полная занятость'}</Option>
                           <Option value="partTime">{'Частичная занятость'}</Option>
                           <Option value="projectBased">{'Проектная работа'}</Option>
                           <Option value="volunteering">{'Волонтерство'}</Option>
                           <Option value="civilLawContract">{'Гражданско-правовой договор'}</Option>
                           <Option value="internship">{'Стажировка'}</Option>
                       </Select>
                   )}
               />
           </div>

           {/* Поле для work_schedule */}
           <div>
               <label className={st.lb}>График работы</label>
               <Controller
                   name="work_schedule"
                   control={control}
                   defaultValue=""
                   render={({field}) => (
                       <Select {...field} placeholder={'График работы'} className={st.blockList}>
                           <Option value="fullDay">{'Полный день'}</Option>
                           <Option value="shift">{'Посменный'}</Option>
                           <Option value="flexible">{'Гибкий'}</Option>
                           <Option value="remote">{'Удаленная работа'}</Option>
                           <Option value="rotational">{'По сменам'}</Option>
                       </Select>
                   )}
               />
           </div>

           {/* Поле для sort */}
           <div>
               <label className={st.lb}>Тип сортировки</label>
               <Controller
                   name="sort"
                   control={control}
                   defaultValue="relevance"
                   render={({field}) => (
                       <Select {...field} placeholder={'Тип сортировки'} className={st.blockList}>
                           <Option value="relevance">{'По релевантности'}</Option>
                           <Option value="byUpdatedAt">{'По обновлению'}</Option>
                           <Option value="bySalaryDesc">{'По убыванию зарплаты'}</Option>
                           <Option value="bySalaryAsc">{'По возрастанию зарплаты'}</Option>
                       </Select>
                   )}
               />
           </div>

           {/* Поле для time_period */}
           <div>
               <label className={st.lb}>Временной период</label>
               <Controller
                   name="time_period"
                   control={control}
                   defaultValue="allTime"
                   render={({field}) => (
                       <Select {...field} placeholder={'Временной период'} className={st.blockList}>
                           <Option value="allTime">{'За все время'}</Option>
                           <Option value="month">{'За месяц'}</Option>
                           <Option value="week">{'За неделю'}</Option>
                           <Option value="3days">{'За 3 дня'}</Option>
                           <Option value="lastDay">{'За последний день'}</Option>
                       </Select>
                   )}
               />
           </div>

           {/* Поле для per_page */}
           <div>
               <label className={st.lb}>Количество на странице</label>
               <Controller
                   name="per_page"
                   control={control}
                   defaultValue={20}
                   render={({field}) => (
                       <Select {...field} placeholder={'Количество на странице'} className={st.blockList}>
                           <Option value={20}>20</Option>
                           <Option value={50}>50</Option>
                           <Option value={100}>100</Option>
                       </Select>
                   )}
               />
           </div>

           <div className={st.butReset}>
               {/*<Button type="primary" htmlType="submit">{'Поиск'}</Button>*/}
                    <Button onClick={() => reset()} >{'Сбросить'}</Button>
                </div>
       </form> </div>
        </div>
    );
};

export default SearchForm;
