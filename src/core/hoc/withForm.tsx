"use client";

import { ElementType } from "react";
import {
  Control,
  FieldErrors,
  FieldValues,
  useForm,
} from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui";

export interface WrappedComponentProps<
  TFieldsValues extends FieldValues = FieldValues,
> {
  control: Control<TFieldsValues>;
  errors: FieldErrors<FieldValues>;
}

export type WithFormProps = {
  // eslint-disable-next-line no-unused-vars
  formSubmittedCallback: (data: FieldValues) => void;
};

const withForm =
  <FormFields extends FieldValues = FieldValues>(
    WrappedComponent: ElementType,
    resolver: z.infer<z.Schema<any, any>>,
  ) =>
    // eslint-disable-next-line react/display-name
    (props: WithFormProps) => {
      const {
        control,
        handleSubmit,
        formState: { errors },
      } = useForm<FormFields>({
        resolver: zodResolver(resolver),
      });

      const onSubmit = async (data: FieldValues) => {
        props.formSubmittedCallback(data);
      };

      return (
        <form onSubmit={handleSubmit(onSubmit)}>
          <WrappedComponent
            errors={errors}
            control={control}
          />
          <Button type={"submit"}>Submit</Button>
        </form>
      );
    };

export default withForm;
