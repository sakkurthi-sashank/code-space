import { languageOptions } from '@/constants/languageOptions'
import { Select } from '@mantine/core'

export const LanguageSelection = () => {
  // const { setLanguageId, setLanguage } = useEditorStore((state) => ({
  //   setLanguageId: state.setLanguageId,
  //   setLanguage: state.setLanguage,
  // }));

  // const handleOnChange = (value: string) => {
  //   setLanguageId(
  //     languageOptions.find((option) => option.value === value)?.id!
  //   );
  //   setLanguage(value);
  // };

  return (
    <div className="h-full flex items-center justify-end px-3">
      <Select
        w={'fit-content'}
        radius={'sm'}
        size="xs"
        defaultValue={languageOptions[0].value}
        data={languageOptions}
        // onChange={handleOnChange}
      />
    </div>
  )
}
