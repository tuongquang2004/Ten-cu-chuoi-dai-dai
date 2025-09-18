"use client";

import Breadcrumb from "@/components/Breadcrumb";
import CommonButton from "@/components/CommonButton";
import Filter from "@/components/Filter";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import SearchBar from "@/components/SearchBar";
import CommonTable from "@/components/CommonTable";

import { useSearchAndFilter } from "@/hooks/useSeachAndFilter";
import { useExchangeRateData } from "./hooks/useExchangeRateData";
import { useExchangeRateTable } from "./hooks/useExchangeRateTable";
import { useModal } from "@/hooks/useModal";
import ImportModal from "@/components/ImportModal";
import { useExchangeRateActions } from "./hooks/useExchangeRateActions";
import ContextMenu from "@/components/ContextMenu";
import { useExchangeRateContextMenu } from "./hooks/useExchangeRateContextMenu";
import Dropdown from "@/components/Dropdown";
import { useState } from "react";
import { ExchangeRate } from "@/constants/types";
import { searchOptions, updateOptions } from "@/lib/exchangeRateData";

export default function ExchangeRates() {
  const [searchBy, setSearchBy] = useState<keyof ExchangeRate>("code");
  const { showImportModal, setShowImportModal } = useModal();
  const { items, backup, setItems } = useExchangeRateData();
  const { header } = useExchangeRateTable();
  const { setPendingSearch, setFilter, handleSearch } = useSearchAndFilter(
    backup,
    setItems,
    searchBy
  );
  const { changeStatus, getRate } = useExchangeRateActions(setItems);
  const { selected, menuPos, handleContextMenu } = useExchangeRateContextMenu();
  const [updateRate, setUpdateRate] = useState<string>("Never");

  return (
    <div>
      {showImportModal && (
        <ImportModal
          label="Import Rates"
          buttonLabel="Import Exchange Rates"
          onClose={() => setShowImportModal(false)}
          templateFile="exchange_rates_template.txt"
        />
      )}
      {menuPos && selected && (
        <div
          className="absolute"
          style={{
            top: menuPos.y,
            left: menuPos.x,
          }}
        >
          <ContextMenu
            items={[
              {
                label: selected.isActive ? "Deactivate" : "Activate",
                key: "action",
                onClick: () => {
                  changeStatus(selected?.id, !selected?.isActive);
                },
              },
            ]}
          />
        </div>
      )}
      <Layout>
        <div className="flex flex-1 h-full">
          <div className="px-12 p-6 flex flex-col gap-3 w-full">
            <Breadcrumb current="Exchange Rates"></Breadcrumb>
            <PageHeader
              title="Manage Exchange Rates"
              subtitle="Adjust Exchange Rates for Multi-currency Transactions."
            />
            <div className="flex justify-between gap-3 flex-col xl:flex-row">
              <div className="flex items-center flex-1">
                <SearchBar<ExchangeRate>
                  onChange={setPendingSearch}
                  buttonFunction={handleSearch}
                  placeholder="Search Referral Sources"
                  iconAlign="left"
                  buttonAlign="right"
                  searchBy={{
                    items: searchOptions,
                    selectedKey: "code",
                    onChange: setSearchBy,
                  }}
                  className="border border-[#98A2B3] h-full placeholder:text-[14px] w-full max-w-[417px]"
                />
              </div>
              <div className="flex justify-center xl:justify-end gap-3 w-fit justify-self-end">
                <CommonButton
                  variant="outline"
                  onClick={() => setShowImportModal(true)}
                >
                  Import
                </CommonButton>
                <CommonButton variant="outline">Export</CommonButton>
                <div className="cursor-pointer inline-flex items-center justify-center font-medium transition px-[18px] py-[6px] border border-[#D0D5DD] text-[#1D2939] rounded-full">
                  <Dropdown
                    className="min-w-[15rem]"
                    label={`Auto Update Rates (${updateRate.charAt(0).toUpperCase() + updateRate.slice(1)})`}
                    items={updateOptions}
                    selectedKey="never"
                    onChange={setUpdateRate}
                  />
                </div>
                <CommonButton
                  variant="outline"
                  className="bg-[#E87200] text-white border-none"
                  onClick={() => getRate()}
                >
                  Get All Rates
                </CommonButton>
              </div>
            </div>
            <div>
              <Filter
                onChange={setFilter}
                label="Status"
                showCount={true}
                showReset={true}
                items={[
                  { key: "active", label: "Active", value: "true" },
                  { key: "inactive", label: "Inactive", value: "false" },
                ]}
              />
              <div
                className={`flex justify-end w-full flex-1 text-[#707070] text-sm italic`}
              >
                Default Currency AUD
              </div>
            </div>
            <CommonTable
              selectedId={selected?.id}
              pagination
              data={items}
              columns={header}
              onContextMenu={(row, e) => handleContextMenu(row, e)}
            />
          </div>
        </div>
      </Layout>
    </div>
  );
}
