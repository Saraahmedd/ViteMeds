import { getPharmacists } from "@/app/redux/actions/pharmacistActions";
import { removeUser } from "@/app/redux/actions/userActions";
import { BottomCallout } from "@/components/BottomCallout";
import PersonalCard from "@/components/PersonCard";
import TableComponent from "@/components/Table";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatDateToDDMMYYYY } from "../../redux/validators";

//OPTIONAL
// const buttons = {
//   right: {
//     label: "Reject",
//     onClick: () => console.log("Purple button clicked"),
//   },
//   left: {
//     label: "Accept",
//     onClick: () => console.log("Transparent button clicked"),
//   },
// };

const Application = () => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState();
  const [visibleFeedback, setVisibleFeedback] = useState(false);
  const { pharmacists, loading } = useSelector(
    (state) => state.getPharmacistsReducer
  );
  const {
    loading: removeLoading,
    success: removeSuccess,
    error: removeError,
  } = useSelector((state) => state.removeUserReducer);
  useEffect(() => {
    // dispatch(login("sysadmin","pass1234"));
    dispatch(getPharmacists());
  }, [dispatch, removeLoading]);

  const [freeze, setFreeze] = useState(false);

  const handleSelect = (id) => {
    for (let i = 0; i < pharmacistList.length; i++) {
      if (pharmacistList[i]._id == id) {
        setSelected(pharmacistList[i]);
        break;
      }
    }
    setFreeze(true);
  };

  const pharmacistList = useMemo(() => {
    return pharmacists.data?.map(({ _id, user, dateOfBirth, ...rest }) => ({
      ...rest,
      ...user,
      dateOfBirth: formatDateToDDMMYYYY(dateOfBirth),
    }));
  }, [removeError, pharmacists]);

  return (
    <>
      {removeSuccess && (
        // Show success message for user removal
        <BottomCallout
          message="User removed successfully"
          variant="success"
          visible={true}
          setVisible={setVisibleFeedback}
        />
      )}
      {removeError && (
        // Show error message for user removal failure
        <BottomCallout
          message="Error removing user"
          variant="error"
          visible={true}
          setVisible={setVisibleFeedback}
        />
      )}

      <>
        <div className="flex overflow-hidden gap-x-4 gap-y-8">
          <div className="prof h-400 overflow-hidden w-4/6 rounded-xl p-10">
            <TableComponent
              setSelected={setSelected}
              rows={pharmacistList}
              columns={["Username", "Name", "Email"]}
              fields={["username", "name", "email"]}
              freeze={freeze}
              buttons={[
                {
                  size: "xs",
                  variant: "secondary",
                  color: "rose",
                  label: "Delete",
                  className: "mx-2",
                  icon: () => (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  ),
                  function: (id) => dispatch(removeUser(id)),
                },
                {
                  size: "xs",
                  variant: "secondary",
                  label: "Select",
                  className: "mx-2",
                  icon: () => (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-4 h-4 px"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59"
                      />
                    </svg>
                  ),
                  function: (id) => handleSelect(id),
                },
              ]}
              badgeColumns={[]}
              title={"Manage the Approved Pharmacists"}
            />
          </div>

          <div className="prof h-400 overflow-hidden w-2/6 rounded-xl p-10">
            <PersonalCard
              imageUrl="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
              name={selected?.name}
              title="Marketing Exec. at Denva Corp"
              description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto, placeat!"
              data={selected}
              displayColumns={["Status", "Joined On"]}
              actualColumns={["status", "joinedOn"]}
              // buttons={buttons}
              worker={true}
              fields={[
                "email",
                "dateOfBirth",
                "username",
                "hourlyRate",
                "affiliation",
              ]}
              displayNames={[
                "Email",
                "Birth Date",
                "Username",
                "Hourly Rate",
                "Affiliation",
              ]}
            />
          </div>
        </div>{" "}
      </>
    </>
  );
};

export default Application;
