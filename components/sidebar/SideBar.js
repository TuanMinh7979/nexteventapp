import React from "react";
import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContextProvider";
import { ThemeContext } from "../../context/ThemeContextProvider";

const SideBar = () => {
  const { user, accessToken, signOut } = useContext(AuthContext);

  const themeState = useContext(ThemeContext);

  const theme = themeState[themeState.active];
  return (
    <aside
      style={{
        backgroundColor: theme["headerColor"],
        color: theme["headerTextColor"],
      }}
      id="logo-sidebar"
      class="fixed top-0 left-0 z-40 w-56 h-screen pt-20 transition-transform -translate-x-full bg-white border-r sm:translate-x-0 "
      aria-label="Sidebar"
    >
      <div
        style={{
          backgroundColor: theme["headerColor"],
          color: `${theme["headerTextColor"]} !important`,
        }}
        class="h-full px-3 pb-4 overflow-y-auto "
      >
        <ul class="space-y-2">
          <li>
            <Link
              href="/"
              class={`flex items-center p-2 text-base font-normal text-gray-900 rounded-lg ${
                themeState.active == "light"
                  ? "hover:bg-gray-100"
                  : "hover:bg-gray-700"
              }  `}
            >
              <svg
                style={{ color: theme["headerTextColor"] }}
                aria-hidden="true"
                class="w-6 h-6 text-gray-500 transition duration-75  group-hover:text-gray-900 "
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
              </svg>
              <span style={{ color: theme["headerTextColor"] }} class="ml-3">
                Dashboard
              </span>
            </Link>
          </li>
          {accessToken && (
            <>
              <li>
                <Link
                  href="/task"
                  class={`flex items-center p-2 text-base font-normal text-gray-900 rounded-lg ${
                    themeState.active == "light"
                      ? "hover:bg-gray-100"
                      : "hover:bg-gray-700"
                  }  `}
                >
                  <svg
                    style={{ color: theme["headerTextColor"] }}
                    aria-hidden="true"
                    class="w-6 h-6 text-gray-500 transition duration-75  group-hover:text-gray-900 "
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                  </svg>
                  <span
                    style={{ color: theme["headerTextColor"] }}
                    class="ml-3"
                  >
                    Event Calendar
                  </span>
                </Link>
              </li>

            </>
          )}
          {!accessToken && (
            <>
              <li>
                <Link
                  href="/login"
                  class={`flex items-center p-2 text-base font-normal text-gray-900 rounded-lg ${
                    themeState.active == "light"
                      ? "hover:bg-gray-100"
                      : "hover:bg-gray-700"
                  }  `}
                >
                  <svg
                    style={{ color: theme["headerTextColor"] }}
                    aria-hidden="true"
                    class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span
                    style={{ color: theme["headerTextColor"] }}
                    class="flex-1 ml-3 whitespace-nowrap"
                  >
                    Sign In
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  class={`flex items-center p-2 text-base font-normal text-gray-900 rounded-lg ${
                    themeState.active == "light"
                      ? "hover:bg-gray-100"
                      : "hover:bg-gray-700"
                  }  `}
                >
                  <svg
                    style={{ color: theme["headerTextColor"] }}
                    aria-hidden="true"
                    class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span
                    style={{ color: theme["headerTextColor"] }}
                    class="flex-1 ml-3 whitespace-nowrap"
                  >
                    Sign Up
                  </span>
                </Link>
              </li>
            </>
          )}

          {accessToken && (
            <li
              class={`flex items-center p-2 text-base font-normal text-gray-900 rounded-lg ${
                themeState.active == "light"
                  ? "hover:bg-gray-100"
                  : "hover:bg-gray-700"
              }  `}
            >
              <svg
                style={{ color: theme["headerTextColor"] }}
                aria-hidden="true"
                class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span
                style={{ color: theme["headerTextColor"] }}
                onClick={() => signOut()}
                class="flex-1 ml-3 whitespace-nowrap"
              >
                Sign Out
              </span>
            </li>
          )}

          {/* authen */}
        </ul>
      </div>
    </aside>
  );
};

export default SideBar;
