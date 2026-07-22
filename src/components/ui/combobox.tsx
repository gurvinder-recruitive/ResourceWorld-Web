"use client"

import * as React from "react"
import { Combobox as ComboboxPrimitive } from "@base-ui/react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../../components/ui/input-group"
import { ChevronDownIcon, XIcon, CheckIcon } from "lucide-react"

const Combobox = ComboboxPrimitive.Root

function ComboboxValue({
  ...props
}: React.ComponentProps<typeof ComboboxPrimitive.Value>) {
  return <ComboboxPrimitive.Value data-slot="combobox-value" {...props} />;
}

interface ComboboxTriggerProps
  extends React.ComponentProps<typeof ComboboxPrimitive.Trigger> {
  className?: string;
  children?: React.ReactNode;
}

function ComboboxTrigger({
  className,
  children,
  ...props
}:ComboboxTriggerProps) {
  return (
    <ComboboxPrimitive.Trigger
      data-slot="combobox-trigger"
      className={cn("[&_svg:not([class*='size-'])]:size-4", className)}
      {...props}>
      {children}
      <ChevronDownIcon className="pointer-events-none size-4 text-muted-foreground" />
    </ComboboxPrimitive.Trigger>
  );
}

type ComboboxClearProps = React.ComponentProps<typeof ComboboxPrimitive.Clear>;

function ComboboxClear({
  className,
  ...props
}:ComboboxClearProps) {
  return (
    <ComboboxPrimitive.Clear
      data-slot="combobox-clear"
      render={<InputGroupButton variant="ghost" size="icon-xs" />}
      className={cn(className)}
      {...props}>
      <XIcon className="pointer-events-none" />
    </ComboboxPrimitive.Clear>
  );
}

interface ComboboxInputProps
  extends React.ComponentProps<typeof ComboboxPrimitive.Input> {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  showTrigger?: boolean;
  showClear?: boolean;
}

function ComboboxInput({
  className,
  children,
  disabled = false,
  showTrigger = true,
  showClear = false,
  ...props
}:ComboboxInputProps) {
  return (
    <InputGroup className={cn("w-auto", className)}>
      <ComboboxPrimitive.Input render={<InputGroupInput disabled={disabled} />} {...props} />
      <InputGroupAddon align="inline-end">
        {showTrigger && (
          <InputGroupButton
            size="icon-xs"
            variant="ghost"
            asChild
            data-slot="input-group-button"
            className="group-has-data-[slot=combobox-clear]/input-group:hidden data-pressed:bg-transparent"
            disabled={disabled}>
            <ComboboxTrigger />
          </InputGroupButton>
        )}
        {showClear && <ComboboxClear disabled={disabled} />}
      </InputGroupAddon>
      {children}
    </InputGroup>
  );
}

type ComboboxContentProps =
  React.ComponentProps<typeof ComboboxPrimitive.Popup> &
  Pick<
    React.ComponentProps<typeof ComboboxPrimitive.Positioner>,
    "side" | "sideOffset" | "align" | "alignOffset" | "anchor"
  > & {
    className?: string;
  };


function ComboboxContent({
  className,
  side = "bottom",
  sideOffset = 6,
  align = "start",
  alignOffset = 0,
  anchor,
  ...props
}:ComboboxContentProps) {
  return (
    <ComboboxPrimitive.Portal>
      <ComboboxPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        anchor={anchor}
        className="isolate z-50">
        <ComboboxPrimitive.Popup
          data-slot="combobox-content"
          data-chips={!!anchor}
          className={cn(
            "group/combobox-content relative max-h-(--available-height) w-(--anchor-width) max-w-(--available-width) min-w-[calc(var(--anchor-width)+--spacing(7))] origin-(--transform-origin) overflow-hidden rounded-lg bg-popover text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 data-[chips=true]:min-w-(--anchor-width) data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 *:data-[slot=input-group]:m-1 *:data-[slot=input-group]:mb-0 *:data-[slot=input-group]:h-8 *:data-[slot=input-group]:border-input/30 *:data-[slot=input-group]:bg-input/30 *:data-[slot=input-group]:shadow-none data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
            className
          )}
          {...props} />
      </ComboboxPrimitive.Positioner>
    </ComboboxPrimitive.Portal>
  );
}

type ComboboxListProps =
  React.ComponentProps<typeof ComboboxPrimitive.List>;

function ComboboxList({
  className,
  ...props
}:ComboboxListProps) {
  return (
    <ComboboxPrimitive.List
      data-slot="combobox-list"
      className={cn(
        "no-scrollbar max-h-[min(calc(--spacing(72)---spacing(9)),calc(var(--available-height)---spacing(9)))] scroll-py-1 overflow-y-auto overscroll-contain p-1 data-empty:p-0",
        className
      )}
      {...props} />
  );
}

interface ComboboxItemProps
  extends React.ComponentProps<typeof ComboboxPrimitive.Item> {
  className?: string;
  children?: React.ReactNode;
}

function ComboboxItem({
  className,
  children,
  ...props
}:ComboboxItemProps ) {
  return (
    <ComboboxPrimitive.Item
      data-slot="combobox-item"
      className={cn(
        "relative flex w-full cursor-default items-center gap-2 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground not-data-[variant=destructive]:data-highlighted:**:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}>
      {children}
      <ComboboxPrimitive.ItemIndicator
        render={
          <span
            className="pointer-events-none absolute right-2 flex size-4 items-center justify-center" />
        }>
        <CheckIcon className="pointer-events-none" />
      </ComboboxPrimitive.ItemIndicator>
    </ComboboxPrimitive.Item>
  );
}
type ComboboxGroupProps =
  React.ComponentProps<typeof ComboboxPrimitive.Group>;

function ComboboxGroup({
  className,
  ...props
}:ComboboxGroupProps) {
  return (<ComboboxPrimitive.Group data-slot="combobox-group" className={cn(className)} {...props} />);
}

type ComboboxLabelProps =
  React.ComponentProps<typeof ComboboxPrimitive.GroupLabel>;

function ComboboxLabel({
  className,
  ...props
}:ComboboxLabelProps) {
  return (
    <ComboboxPrimitive.GroupLabel
      data-slot="combobox-label"
      className={cn("px-2 py-1.5 text-xs text-muted-foreground", className)}
      {...props} />
  );
}
type ComboboxCollectionProps =
  React.ComponentProps<typeof ComboboxPrimitive.Collection>;

function ComboboxCollection({
  ...props
}:ComboboxCollectionProps) {
  return (<ComboboxPrimitive.Collection data-slot="combobox-collection" {...props} />);
}

type ComboboxEmptyProps =
  React.ComponentProps<typeof ComboboxPrimitive.Empty>;

function ComboboxEmpty({
  className,
  ...props
}:ComboboxEmptyProps) {
  return (
    <ComboboxPrimitive.Empty
      data-slot="combobox-empty"
      className={cn(
        "hidden w-full justify-center py-2 text-center text-sm text-muted-foreground group-data-empty/combobox-content:flex",
        className
      )}
      {...props} />
  );
}

type ComboboxSeparatorProps =
  React.ComponentProps<typeof ComboboxPrimitive.Separator>;
    
function ComboboxSeparator({
  className,
  ...props
}:ComboboxSeparatorProps) {
  return (
    <ComboboxPrimitive.Separator
      data-slot="combobox-separator"
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...props} />
  );
}

type ComboboxChipsProps =
  React.ComponentProps<typeof ComboboxPrimitive.Chips>;

function ComboboxChips({
  className,
  ...props
}:ComboboxChipsProps) {
  return (
    <ComboboxPrimitive.Chips
      data-slot="combobox-chips"
      className={cn(
        "flex flex-wrap items-center py-1 gap-1 min-h-10 2xl:min-h-12 h-auto w-full rounded-sm  leading-none border border-[#dddddd] bg-gray-muted px-4  text-base 2xl:text-[17px] outline-none transition-colors placeholder:text-777 focus-visible:border-[#000000] focus-visible:ring-0 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props} />
  );
}

interface ComboboxChipProps
  extends React.ComponentProps<typeof ComboboxPrimitive.Chip> {
  className?: string;
  children?: React.ReactNode;
  showRemove?: boolean;
}

function ComboboxChip({
  className,
  children,
  showRemove = true,
  ...props
}:ComboboxChipProps) {
  return (
    <ComboboxPrimitive.Chip
      data-slot="combobox-chip"
      className={cn(
        "flex h-[calc(--spacing(6.25))] w-fit items-center justify-center gap-1 rounded-full bg-white px-2.5 py-1.5 text-sm font-light whitespace-nowrap text-accent border border-accent has-disabled:pointer-events-none has-disabled:cursor-not-allowed has-disabled:opacity-50 has-data-[slot=combobox-chip-remove]:pr-0",
        className
      )}
      {...props}>
      {children}
      {showRemove && (
        <ComboboxPrimitive.ChipRemove
          render={<Button variant="link" size="icon-xs" />}
          className="-ml-1 opacity-60 hover:opacity-100 text-accent"
          data-slot="combobox-chip-remove">
          <XIcon className="pointer-events-none size-4" />
        </ComboboxPrimitive.ChipRemove>
      )}
    </ComboboxPrimitive.Chip>
  );
}

type ComboboxChipsInputProps =
  React.ComponentProps<typeof ComboboxPrimitive.Input>;


function ComboboxChipsInput({
  className,
  ...props
}:ComboboxChipsInputProps) {
  return (
    <ComboboxPrimitive.Input
      data-slot="combobox-chip-input"
      className={cn("min-w-16 flex-1 outline-none", className)}
      {...props} />
  );
}

function useComboboxAnchor() {
  return React.useRef(null);
}

export {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxGroup,
  ComboboxLabel,
  ComboboxCollection,
  ComboboxEmpty,
  ComboboxSeparator,
  ComboboxChips,
  ComboboxChip,
  ComboboxChipsInput,
  ComboboxTrigger,
  ComboboxValue,
  useComboboxAnchor,
}
