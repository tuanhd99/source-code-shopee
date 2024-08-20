import { useForm } from "react-hook-form";
import { schemaSearchName, SchemaSearchName } from "src/utils/validate";
import useQueryConfig from "./useQueryConfig";
import { yupResolver } from "@hookform/resolvers/yup";
import { createSearchParams, useNavigate } from "react-router-dom";
import { RouterPath } from "src/router/util";
import { omit } from "lodash";

function useSearchProduct() {
  const queryConfig = useQueryConfig();
  const navigate = useNavigate();
  const { handleSubmit, register } = useForm<SchemaSearchName>({
    defaultValues: {
      name: ""
    },
    resolver: yupResolver(schemaSearchName)
  });
  const onSubmitSearch = handleSubmit((data) => {
    const queryParams = queryConfig.queryConfig.order
      ? omit(
          {
            ...queryConfig.queryConfig,
            name: data.name
          },
          ["order", "sort_by"]
        )
      : { ...queryConfig.queryConfig, name: data.name };
    const newQueryParams = { ...queryParams };
    const searchParams = new URLSearchParams(newQueryParams as any);
    navigate({
      pathname: RouterPath.Index,
      search: `?${createSearchParams(searchParams).toString()}`
    });
  });

  return { onSubmitSearch, register };
}

export default useSearchProduct;
